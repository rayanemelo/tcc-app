import PageTitle from '@/components/PageTitle';
import History from '@/screens/History';
import { RenderAuth } from '@/components/shared/RenderAuth';

export default function HistoryScreen() {
  return (
    <>
      <PageTitle text="Histórico" />
      <RenderAuth>
        <History />
      </RenderAuth>
    </>
  );
}
