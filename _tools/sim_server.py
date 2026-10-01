# -*- coding: utf-8 -*-
"""模拟 GitHub Pages 的静态服务：找不到路径时返回自定义 404.html。

用法: python sim_server.py <站点根目录> <端口>
"""
import http.server
import os
import sys

ROOT = os.path.abspath(sys.argv[1])
PORT = int(sys.argv[2])
PAGE_404 = os.path.abspath(sys.argv[3]) if len(sys.argv) > 3 else os.path.join(ROOT, "404.html")


class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=ROOT, **kwargs)

    def log_message(self, *args):
        pass

    def send_error(self, code, message=None, explain=None):
        if code == 404:
            page = PAGE_404
            if os.path.isfile(page):
                with open(page, "rb") as f:
                    body = f.read()
                self.send_response(404)
                self.send_header("Content-Type", "text/html; charset=utf-8")
                self.send_header("Content-Length", str(len(body)))
                self.end_headers()
                self.wfile.write(body)
                return
        super().send_error(code, message, explain)


http.server.ThreadingHTTPServer(("127.0.0.1", PORT), Handler).serve_forever()
