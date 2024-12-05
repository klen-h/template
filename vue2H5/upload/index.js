const SftpClient = require('ssh2-sftp-client')

const sftp = new SftpClient()

const process = require('process')

const env = process.argv[2]
const config = require('../upload.config')

// SFTP 连接配置
const sftpConfig = {
  host: 'your.sftp.server',
  port: '22',
  username: 'your-username',
  password: 'your-password', // 或者使用 privateKey: 'path/to/private/key'
}

// 本地构建目录和远程目标目录
const localDir = './dist' // 假设你的构建输出在这里
const remoteDir = config[env].path

async function deploy() {
  try {
    // 连接到 SFTP 服务器
    await sftp.connect(sftpConfig)
    // 上传文件
    await sftp.uploadDir(localDir, remoteDir)
    console.log('Deployment successful!')
  } catch (err) {
    console.error('Deployment failed:', err)
  } finally {
    // 关闭 SFTP 连接
    await sftp.end()
  }
}

deploy()
