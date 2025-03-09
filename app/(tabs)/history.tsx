import ParallaxScrollView from '@/components/ui/ParallaxScrollView';

import PageTitle from '@/components/PageTitle';
import { useAuth } from '@/context/AuthContext';
import History from '@/screens/History';
import AuthPrompt from '@/components/Authentication/AuthPrompt';
import Authentication from '@/components/Authentication';
import { useState } from 'react';

export default function HistoryScreen() {
  const { authentication } = useAuth();
  const [auth, setAuth] = useState(false);
  console.log('authentication: ', authentication);

  const handleAuthenticate = () => {
    setAuth(true);
  };

  return (
    <>
      <PageTitle text="Histórico" />

      {!authentication.authenticated ? (
        <>
          <AuthPrompt onAuthenticate={handleAuthenticate} />

          {auth && (
            <Authentication
              handleCancel={() => {
                setAuth(false);
              }}
              handleConfirm={() => setAuth(false)}
            />
          )}
        </>
      ) : (
        <ParallaxScrollView>
          <History />
        </ParallaxScrollView>
      )}
    </>
  );
}
