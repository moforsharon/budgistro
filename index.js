// import { registerRootComponent } from 'expo';
// import App from './App';
// import { Platform } from 'react-native';
// import './global.css';

// if (Platform.OS === 'web') {

//   let deferredPrompt;

//   window.addEventListener('beforeinstallprompt', (e) => {
//     // Prevent the mini-infobar from appearing on mobile
//     e.preventDefault();
//     // Stash the event so it can be triggered later.
//     deferredPrompt = e;
//     // Update UI to notify the user they can add to home screen
//     const installButton = document.getElementById('installButton');
//     if (installButton) {
//       installButton.style.display = 'block'; // Show the install button
//     }
//   });

//   const installButton = document.getElementById('installButton');
//   if (installButton) {
//     installButton.addEventListener('click', (e) => {
//       // Show the install prompt
//       deferredPrompt.prompt();
//       // Wait for the user to respond to the prompt
//       deferredPrompt.userChoice.then((choiceResult) => {
//         if (choiceResult.outcome === 'accepted') {
//           console.log('User accepted the A2HS prompt');
//         } else {
//           console.log('User dismissed the A2HS prompt');
//         }
//         deferredPrompt = null;
//       });
//     });
//   }

//   if ('serviceWorker' in navigator) {
//     window.addEventListener('load', () => {
//       navigator.serviceWorker.register('/service-worker.js')
//         .then(registration => {
//           console.log('SW registered: ', registration);
//         })
//         .catch(registrationError => {
//           console.log('SW registration failed: ', registrationError);
//         });
//     });
//   }
// }

// registerRootComponent(App);

// import { registerRootComponent } from 'expo';
// import App from './App';
// import { Platform } from 'react-native';
// import './global.css';
// import React, { useState, useEffect } from 'react';
// import ReactDOM from 'react-dom';
// import Modal from 'react-modal';

// if (Platform.OS === 'web') {
//   let deferredPrompt;

//   const InstallPromptModal = () => {
//     const [modalIsOpen, setIsOpen] = useState(false);

//     useEffect(() => {
//       const promptHandler = (e) => {
//         e.preventDefault();
//         deferredPrompt = e;
//         setIsOpen(true);
//       };

//       window.addEventListener('beforeinstallprompt', promptHandler);

//       return () => {
//         window.removeEventListener('beforeinstallprompt', promptHandler);
//       };
//     }, []);

//     const handleInstallClick = () => {
//       setIsOpen(false);
//       if (deferredPrompt) {
//         deferredPrompt.prompt();
//         deferredPrompt.userChoice.then((choiceResult) => {
//           if (choiceResult.outcome === 'accepted') {
//             console.log('User accepted the A2HS prompt');
//           } else {
//             console.log('User dismissed the A2HS prompt');
//           }
//           deferredPrompt = null;
//         });
//       }
//     };

//     const closeModal = () => {
//       setIsOpen(false);
//     };

//     return (
//       <Modal
//         isOpen={modalIsOpen}
//         onRequestClose={closeModal}
//         contentLabel="Install PWA"
//       >
//         <h2>Install App</h2>
//         <p>Would you like to install this app on your home screen?</p>
//         <button onClick={handleInstallClick}>Install</button>
//         <button onClick={closeModal}>Cancel</button>
//       </Modal>
//     );
//   };

//   Modal.setAppElement('#root');

//   ReactDOM.render(<InstallPromptModal />, document.getElementById('root'));

//   if ('serviceWorker' in navigator) {
//     window.addEventListener('load', () => {
//       navigator.serviceWorker.register('/service-worker.js')
//         .then(registration => {
//           console.log('SW registered: ', registration);
//         })
//         .catch(registrationError => {
//           console.log('SW registration failed: ', registrationError);
//         });
//     });
//   }
// }

// registerRootComponent(App);

import { registerRootComponent } from 'expo';
import App from './App';
import { Platform } from 'react-native';
import './global.css';
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import { InstallPWA } from './src/InstallPromptModal';

if (Platform.OS === 'web') {
  let deferredPrompt;

  const InstallPromptModal = () => {
    const [modalIsOpen, setIsOpen] = useState(false);

    useEffect(() => {
      const promptHandler = (e) => {
        e.preventDefault();
        deferredPrompt = e;
        setIsOpen(true);
      };

      window.addEventListener('beforeinstallprompt', promptHandler);

      return () => {
        window.removeEventListener('beforeinstallprompt', promptHandler);
      };
    }, []);

    const handleInstallClick = () => {
      setIsOpen(false);
      if (deferredPrompt) {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult) => {
          if (choiceResult.outcome === 'accepted') {
            console.log('User accepted the A2HS prompt');
          } else {
            console.log('User dismissed the A2HS prompt');
          }
          deferredPrompt = null;
        });
      }
    };

    const closeModal = () => {
      setIsOpen(false);
    };

    return (
      <InstallPWA modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} />
    );
  };

  Modal.setAppElement('#root');

  ReactDOM.render(
    <>
      <App />
      <InstallPromptModal />
    </>,
    document.getElementById('root')
  );

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js')
        .then(registration => {
          console.log('SW registered: ', registration);
        })
        .catch(registrationError => {
          console.log('SW registration failed: ', registrationError);
        });
    });
  }
}

registerRootComponent(App);
