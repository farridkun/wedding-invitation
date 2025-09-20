// Utility script to generate invitation links for all guests
// Run this in the browser console or as a separate script

import { sheetsService } from '../services/googleSheets';

export const generateInvitationLinks = async (): Promise<{ name: string; link: string }[]> => {
  try {
    const links = await sheetsService.generateAllInvitationLinks();

    console.log('🎉 Wedding Invitation Links Generated!');
    console.log('=====================================');

    links.forEach(({ name, link }: { name: string; link: string }) => {
      console.log(`${name}: ${link}`);
    });

    console.log('\n📧 Copy these links to send to your guests!');
    console.log('Example usage: Share the link with the guest\'s name as parameter');

    return links;
  } catch (error) {
    console.error('Error generating invitation links:', error);
    return [];
  }
};

// Example usage in browser console:
// import('./utils/invitationLinks.js').then(module => module.generateInvitationLinks());
