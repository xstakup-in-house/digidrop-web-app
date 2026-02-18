import { getPassById } from '@/app/data/digi-pass/pass'
import PassDetailClient from '../../_components/dashboard/pass-detail-client'


type Params = Promise<{ passId: string }>
const PassDetailPage = async ({params}:{params: Params}) => {
  const passParam = await params
  const passid = passParam.passId
  const signlePass = await getPassById(passid)
  return <PassDetailClient pass={signlePass} />;
}

export default PassDetailPage