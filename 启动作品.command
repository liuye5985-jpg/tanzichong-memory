#!/bin/zsh
cd "${0:A:h}"
port=8766
if lsof -tiTCP:$port -sTCP:LISTEN >/dev/null; then
  print '端口 8766 已被占用。请关闭此前启动的本地作品后重试。'
  read '?按回车退出…'
  exit 1
fi
python3 -m http.server $port --bind 127.0.0.1 &
server_pid=$!
trap 'kill $server_pid 2>/dev/null' EXIT INT TERM
sleep 1
open "http://127.0.0.1:$port/"
print '作品已启动。关闭此终端窗口可停止本地服务。'
wait $server_pid
