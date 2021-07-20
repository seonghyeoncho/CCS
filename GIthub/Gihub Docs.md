# Github Docs
프로젝트를 진행할 때 필요한 API를 찾아보면서 정리한 깃허브 API

- Repositories
  - Get a Repository


Repository Content 접근방법
  - https://api.github.com/repos/{user}/{repo}/contents/{path}//download_url
  - download_url이 null이면 디렉토리, 아니면 파일