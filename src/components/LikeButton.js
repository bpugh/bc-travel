import React from 'react'
import Heart from './Heart'

const LOCAL_STORAGE_KEY = 'bctravel:likes'

function getLikeForPostFromLocalStorage(slug) {
  let data = window.localStorage.getItem(LOCAL_STORAGE_KEY)
  let count = 0

  if (data) {
    data = JSON.parse(data)

    if (data[slug]) {
      count = data[slug]
    }
  }

  return count
}

function setLikeForPostInLocalStorage(slug, count) {
  let data = window.localStorage.getItem(LOCAL_STORAGE_KEY)
  let update = { [slug]: count }

  if (data) {
    data = JSON.parse(data)
    update = { ...data, [slug]: count }
  }

  window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(update))
}

function LikeButton({ slug }) {
  const [likes, setLikes] = React.useState(undefined)
  console.log('like button')
  const addLike = () => {
    // if (process.env.NODE_ENV !== 'production') {
    //   return
    // }
    setLikes(likes + 1)
    setLikeForPostInLocalStorage(slug, 1)
    fetch(`/.netlify/functions/register-like?slug=${slug}`)
      .then((res) => res.json())
      .then((json) => {
        if (typeof json.likes === 'number') {
          //   setLikes(json.likes)
        }
      })
  }
  React.useEffect(() => {
    fetch(`/.netlify/functions/get-like?slug=${slug}`)
      .then((res) => res.json())
      .then((json) => {
        if (typeof json.likes === 'number') {
          setLikes(json.likes)
        }
      })
  }, [slug])

  if (typeof likes === 'undefined') {
    return null
  }

  const hasAlreadyLiked = getLikeForPostFromLocalStorage(slug) > 0
  return (
    <div className="like-button-wrapper">
      <Heart isClicked={hasAlreadyLiked} onClick={addLike} />
      <p style={{ margin: '0 0 .5em 0'}}><small>{likes}</small></p>
    </div>
  )
}

export default LikeButton
