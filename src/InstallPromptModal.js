import React, { useState, useEffect } from 'react';
import { Button, Modal, Card, CardText, CardBody, CardTitle } from 'reactstrap';
import useIosInstallPrompt from './hooks/useIosInstallPrompt';
import useWebInstallPrompt from './hooks/useWebInstallPrompt';

export const InstallPWA = ({ modalIsOpen, setIsOpen }) => {
  const [iosInstallPrompt, handleIOSInstallDeclined] = useIosInstallPrompt();
  const [webInstallPrompt, handleWebInstallDeclined, handleWebInstallAccepted] = useWebInstallPrompt();

  if (!iosInstallPrompt && !webInstallPrompt) {
    return null;
  }

  return (
    <Modal isOpen={modalIsOpen} centered toggle={() => setIsOpen(false)}>
      <Card>
        <img
          className="mx-auto"
          style={{
            borderTopRightRadius: '50%',
            borderTopLeftRadius: '50%',
            backgroundColor: '#fff',
            marginTop: '-50px'
          }}
          width="100px"
          src="path/to/your/icon.png"
          alt="Icon"
        />
        <CardBody>
          <CardTitle className="text-center">
            <h3>Install App</h3>
          </CardTitle>
          {iosInstallPrompt && (
            <>
              <CardText className="text-center">
                Tap
                <img
                  src="path/to/ios/share/icon.png"
                  style={{ margin: 'auto 8px 8px' }}
                  alt="Add to homescreen"
                  width="20"
                />
                then "Add to Home Screen"
              </CardText>
              <div className="d-flex justify-content-center">
                <Button onClick={handleIOSInstallDeclined}>Close</Button>
              </div>
            </>
          )}
          {webInstallPrompt && (
            <div className="d-flex justify-content-around">
              <Button color="primary" onClick={handleWebInstallAccepted}>
                Install
              </Button>
              <Button onClick={handleWebInstallDeclined}>Close</Button>
            </div>
          )}
        </CardBody>
      </Card>
    </Modal>
  );
};
