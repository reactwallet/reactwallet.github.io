import React from 'react'
import { Link } from 'react-router-dom'

import Notice from '../common/Notice'

const ErrorPage = () => (
  <Notice title="Page not found">
    You can start from <Link to="/">here</Link>
  </Notice>
)

export default ErrorPage
