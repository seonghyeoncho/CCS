# Github Action report 

slack에서 github action report 받기

workflow에 각 step 마지막에 추가해주면 된다.

```s
- uses: 8398a7/action-slack@v3
  with:
    status: ${{ job.status }}
    author_name: Integration Test # default: 8398a7@action-slack
    fields: repo,message,commit,author,action,eventName,ref,workflow,job,took # default: repo,commit
    mention: here
    if_mention: failure,cancelled
  env:
    SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK_URL }} # required
  if: always() # Pick up events even if the job fails or is canceled.
```