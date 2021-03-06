NODE_ENV = production

# just a flag
ENV = 'boot'


VUE_APP_PROJECT_NAME = 'zuihou-ui'
# 开发环境请求域名前缀， 该变量仅仅开发环境需要设置
VUE_APP_DEV_REQUEST_DOMAIN_PREFIX = 'http://42.202.130.216:10000'
# 请求域名前缀， 该变量仅仅生产环境需要设置
VUE_APP_PROD_REQUEST_DOMAIN_PREFIX = ''
# 是否启用多租户
VUE_APP_IS_MULTI_TENANT = true
# 是否启用验证码
VUE_APP_IS_CAPTCHA = true
# 客户端秘钥
VUE_APP_CLIENT_ID=zuihou_ui
VUE_APP_CLIENT_SECRET=zuihou_ui_secret

# base api
VUE_APP_BASE_API = '/api'

# 项目中模板附件下载的服务器访问地址,此服务外网可直接访问 测试环境
# VUE_APP_IP_URL_PORT = 'http://112.27.250.251:10000/'
# 项目中模板附件下载的服务器访问地址,此服务外网可直接访问 正式环境
VUE_APP_IP_URL_PORT = 'https://dangtu.keeprisk.com'

