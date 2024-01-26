export default async function mockSendEmail(payload) {
    const { from, to, subject, body } = payload;
    return new Promise((resolve, reject) => {
      console.log(`Sending Email to ${to}....`);
      setTimeout(() => resolve(1), 2 * 1000);
    });
  }

  