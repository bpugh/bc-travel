import React from 'react'

const EmailListForm = () => {
  const handleSubmit = e => {
    window.open('https://buttondown.email/bcadventures', 'popupwindow')
  }

  return (
    <form
      onSubmit={handleSubmit}
      action="https://buttondown.email/api/emails/embed-subscribe/bcadventures"
      method="post"
      target="popupwindow"
    >
      <div className="box notification" style={{ margin: '2rem 0' }}>
        <p className="is-size-4">
          Subscribe to get an update when we publish a new post!
        </p>
        <input type="hidden" value="1" name="embed" />
        <div className="field">
          <div className="control">
            <input
              className="input"
              placeholder="Email address"
              name="email"
              type="email"
            />
          </div>
          <p className="help">
            Enter email address. We send occasional emails and you can
            unsubscribe any time.
          </p>
        </div>
        <div className="control">
          <input className="button is-link" type="submit" value="Subscribe" />
        </div>
        <br />
        <a href="/rss.xml">Or subscribe via RSS</a>
      </div>
    </form>
  )
}

export default EmailListForm
