import React from 'react';

export default class CopyListUrl extends React.Component {

  constructor(props)
  {
    super(props);

    this.copyToClipboard = this.copyToClipboard.bind(this);
  }

  render() {
      return (
        <div>

          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label">Share it : </label>
            </div>
            <div class="field-body">
              <div className="field has-addons has-text-right">
                <div className="control">
                  <input className="input" type="text" value={this.getUrl()} ref={input => this.urlInput = input} readOnly />
                </div>
                <div className="control">
                  <button className="button is-info" onClick={this.copyToClipboard}>
                    Copy it !
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      );
  }

  getUrl()
  {
    let port = `${window.location.port}`

    if(port != 0 && port != '')
    {
      port = ":" + port;
    }

    return `${window.location.protocol}//${window.location.hostname}${port}/list/${this.props.userId}/`;
  }

  copyToClipboard()
  {
    this.urlInput.select();
    document.execCommand("copy");
  }
}
