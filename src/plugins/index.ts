import { i18nInstall } from './i18n'
import nProgress from './nprogress'
// import './pwa';

export default (): void => {
	i18nInstall()
	nProgress()
}
