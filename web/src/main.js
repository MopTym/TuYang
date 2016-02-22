import App from './App'
import router from './router'
import service from './services'

service.init()

router.start(App, 'app')
