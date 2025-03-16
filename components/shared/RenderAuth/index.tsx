import Authentication from '@/components/Authentication';
import AuthPrompt from '@/components/Authentication/AuthPrompt';
import ParallaxScrollView from '@/components/ui/ParallaxScrollView';
import { useAuth } from '@/context/AuthContext';
import { useState } from 'react';

type Props = {
  children: React.ReactNode;
};

export function RenderAuth({ children }: Props) {
  const { authentication } = useAuth();

  const [auth, setAuth] = useState(false);

  const handleAuthenticate = () => {
    setAuth(true);
  };

  return !authentication.authenticated ? (
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
    <ParallaxScrollView>{children}</ParallaxScrollView>
  );
}
