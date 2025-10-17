import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { FaCopy, FaCheck, FaLock, FaEye, FaEyeSlash, FaSearch, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { sheetsService } from '../services/googleSheets';
import type { Guest } from '../services/googleSheets';
import '../styles/admin.css';

const ITEMS_PER_PAGE = 10;

const AdminGuestLinks = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [guests, setGuests] = useState<Guest[]>([]);
  const [loading, setLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [baseUrl, setBaseUrl] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'admin123';

  useEffect(() => {
    setBaseUrl(`${window.location.origin}`);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setError('');
      loadGuests();
    } else {
      setError('Invalid password. Please try again.');
      setPassword('');
    }
  };

  const loadGuests = async () => {
    setLoading(true);
    try {
      const guestData = await sheetsService.getAllGuests();
      // Filter out empty rows and sort by No
      const validGuests = guestData
        .filter((g: Guest) => g.Nama && g.Nama.trim() !== '')
        .sort((a: Guest, b: Guest) => (a.No || 0) - (b.No || 0));
      setGuests(validGuests);
      setCurrentPage(1); // Reset to first page when reloading
      setSearchQuery(''); // Clear search when reloading
    } catch (error) {
      console.error('Error loading guests:', error);
      setError('Failed to load guest list. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Filter guests based on search query
  const filteredGuests = useMemo(() => {
    if (!searchQuery.trim()) return guests;
    
    const query = searchQuery.toLowerCase();
    return guests.filter((guest) =>
      guest.Nama.toLowerCase().includes(query) ||
      guest.No?.toString().includes(query)
    );
  }, [guests, searchQuery]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredGuests.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentGuests = filteredGuests.slice(startIndex, endIndex);

  // Reset to page 1 when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of table
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const generateGuestLink = (guestName: string): string => {
    const encodedName = encodeURIComponent(guestName);
    return `${baseUrl}/?guest=${encodedName}`;
  };

  const copyToClipboard = async (guest: Guest, index: number) => {
    const message = `Kepada Yth.
${guest.Nama}

Assalamu'alaikum warahmatullahi wabarakatuh

Maha Suci Allah yang telah menciptakan makhluk-Nya berpasang-pasangan. Dengan izin dan rahmat-Nya, kami bermaksud mengundang Bapak/Ibu/Saudara/i untuk hadir dalam acara resepsi pernikahan kami:
Avni & Dea

Informasi selengkapnya dapat diakses di:
🔗 ${generateGuestLink(guest.Nama)}

Kehadiran dan doa restu dari Bapak/Ibu/Saudara/i merupakan anugerah terindah bagi kami.

Wassalamu'alaikum warahmatullahi wabarakatuh

Kami yang berbahagia,
Avni & Dea`;

    try {
      await navigator.clipboard.writeText(message);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const copyAllLinks = async () => {
    const allLinks = guests
      .map((guest) => `Kepada Yth.
${guest.Nama}

Assalamu'alaikum warahmatullahi wabarakatuh

Maha Suci Allah yang telah menciptakan makhluk-Nya berpasang-pasangan. Dengan izin dan rahmat-Nya, kami bermaksud mengundang Bapak/Ibu/Saudara/i untuk hadir dalam acara resepsi pernikahan kami:
Avni & Dea

Informasi selengkapnya dapat diakses di:
🔗 ${generateGuestLink(guest.Nama)}

Kehadiran dan doa restu dari Bapak/Ibu/Saudara/i merupakan anugerah terindah bagi kami.

Wassalamu'alaikum warahmatullahi wabarakatuh

Kami yang berbahagia,
Avni & Dea

---
`)
      .join('\n');
    
    try {
      await navigator.clipboard.writeText(allLinks);
      setCopiedIndex(-1);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (error) {
      console.error('Failed to copy all links:', error);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="admin-login">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="admin-login-card"
        >
          <div className="admin-login-header">
            <FaLock className="lock-icon" />
            <h1>Admin Access</h1>
            <p>Guest Link Generator</p>
          </div>

          <form onSubmit={handleLogin} className="admin-login-form">
            <div className="form-field">
              <label htmlFor="password">Password</label>
              <div className="password-input-wrapper">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  autoFocus
                  autoComplete="off"
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="error-message"
              >
                {error}
              </motion.div>
            )}

            <button type="submit" className="admin-login-button">
              Access Admin Panel
            </button>
          </form>

          <div className="admin-login-footer">
            <p>🔒 Protected Area - Authorized Access Only</p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="admin-container"
      >
        {/* Header */}
        <div className="admin-header">
          <div className="admin-header-content">
            <h1>Guest Link Generator</h1>
            <p className="admin-subtitle">
              Generate personalized invitation links for your guests
            </p>
          </div>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="logout-button"
          >
            Logout
          </button>
        </div>

        {/* Stats */}
        <div className="admin-stats">
          <div className="stat-card">
            <div className="stat-value">{guests.length}</div>
            <div className="stat-label">Total Guests</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">
              {guests.filter((g) => g.Kehadiran === 'hadir').length}
            </div>
            <div className="stat-label">Confirmed</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">
              {guests.filter((g) => g.Kehadiran === 'pending').length}
            </div>
            <div className="stat-label">Pending</div>
          </div>
        </div>

        {/* Actions */}
        <div className="admin-actions">
          <button onClick={loadGuests} disabled={loading} className="refresh-button">
            {loading ? 'Loading...' : 'Refresh List'}
          </button>
          <button
            onClick={copyAllLinks}
            className="copy-all-button"
            disabled={guests.length === 0}
          >
            {copiedIndex === -1 ? (
              <>
                <FaCheck /> All Links Copied!
              </>
            ) : (
              <>
                <FaCopy /> Copy All Links
              </>
            )}
          </button>
        </div>

        {/* Search Bar */}
        {guests.length > 0 && (
          <div className="search-container">
            <div className="search-input-wrapper">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search by name or number..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="clear-search"
                  aria-label="Clear search"
                >
                  ×
                </button>
              )}
            </div>
            <div className="search-results-info">
              Showing {currentGuests.length} of {filteredGuests.length} guest{filteredGuests.length !== 1 ? 's' : ''}
              {searchQuery && ' (filtered)'}
            </div>
          </div>
        )}

        {/* Guest Links Table */}
        {loading ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading guest list...</p>
          </div>
        ) : guests.length === 0 ? (
          <div className="empty-state">
            <p>No guests found in the database.</p>
            <button onClick={loadGuests} className="refresh-button">
              Try Again
            </button>
          </div>
        ) : filteredGuests.length === 0 ? (
          <div className="empty-state">
            <p>No guests match your search criteria.</p>
            <button onClick={() => setSearchQuery('')} className="refresh-button">
              Clear Search
            </button>
          </div>
        ) : (
          <>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="guest-links-table"
            >
              <div className="table-header">
                <div className="header-cell">No</div>
                <div className="header-cell">Guest Name</div>
                <div className="header-cell">Status</div>
                <div className="header-cell">Invitation Link</div>
                <div className="header-cell">Action</div>
              </div>

              <div className="table-body">
                {currentGuests.map((guest, index) => {
                  const link = generateGuestLink(guest.Nama);
                  const globalIndex = startIndex + index;
                  const isCopied = copiedIndex === globalIndex;

                  return (
                    <motion.div
                      key={guest._id || globalIndex}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.03 }}
                      className="table-row"
                    >
                      <div className="table-cell">{guest.No}</div>
                      <div className="table-cell guest-name">{guest.Nama}</div>
                      <div className="table-cell">
                        <span className={`status-badge status-${guest.Kehadiran}`}>
                          {guest.Kehadiran === 'hadir'
                            ? 'Hadir'
                            : guest.Kehadiran === 'tidak'
                            ? 'Tidak Hadir'
                            : 'Pending'}
                        </span>
                      </div>
                      <div className="table-cell link-cell">
                        <input
                          type="text"
                          value={link}
                          readOnly
                          className="link-input"
                          onClick={(e) => e.currentTarget.select()}
                        />
                      </div>
                      <div className="table-cell">
                        <button
                          onClick={() => copyToClipboard(guest, globalIndex)}
                          className={`copy-button ${isCopied ? 'copied' : ''}`}
                          title="Copy link"
                        >
                          {isCopied ? <FaCheck /> : <FaCopy />}
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="pagination">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="pagination-button"
                  aria-label="Previous page"
                >
                  <FaChevronLeft />
                </button>

                <div className="pagination-info">
                  <span className="pagination-text">
                    Page {currentPage} of {totalPages}
                  </span>
                  <div className="pagination-pages">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                      // Show first page, last page, current page, and adjacent pages
                      const showPage =
                        page === 1 ||
                        page === totalPages ||
                        Math.abs(page - currentPage) <= 1;

                      if (!showPage) {
                        // Show ellipsis
                        if (page === currentPage - 2 || page === currentPage + 2) {
                          return (
                            <span key={page} className="pagination-ellipsis">
                              ...
                            </span>
                          );
                        }
                        return null;
                      }

                      return (
                        <button
                          key={page}
                          onClick={() => handlePageChange(page)}
                          className={`pagination-number ${
                            page === currentPage ? 'active' : ''
                          }`}
                        >
                          {page}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="pagination-button"
                  aria-label="Next page"
                >
                  <FaChevronRight />
                </button>
              </div>
            )}
          </>
        )}
      </motion.div>
    </div>
  );
};

export default AdminGuestLinks;
