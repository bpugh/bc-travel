import React from 'react'
export const onRenderBody = ({ setPostBodyComponents }) => {
  //   setHeadComponents([
  //     <script
  // 			key="tracking"
  //       src="https://cdnjs.cloudflare.com/ajax/libs/tracking.js/1.1.3/tracking-min.js"
  //       type="text/javascript"
  //       async
  //     />,
  //   ])
  setPostBodyComponents([
    <script
      data-goatcounter="https://bpugh.goatcounter.com/count"
      async
      src="//gc.zgo.at/count.js"
    ></script>,
  ])
}
