import React from 'react'
import { HiHeart, HiDotsHorizontal } from "react-icons/hi";
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Post = ({ id, user, user_id, date, title, content, pfp, image }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [options, setOptions] = useState(false)
    const [edit, setEdit] = useState(false)
    const [editedTitle, setEditedTitle] = useState([])
    const [editedContent, setEditedContent] = useState([])
    const [liked, setLiked] = useState(false)
    const [voteDirection, setVoteDirection] = useState()
    const [hasImage, setHasImage] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        fetch(`https://www.api-development.xyz/posts/votes/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
            }
        }).then(response => response.json())
        .then(data => setLiked(data.found_vote))
    }, [])



    const handleToggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    const handleOptions = () => {
        setOptions(!options)
    }

    const handleEdit = () => {
        setEdit(!edit)
    }
    
    const deletePost = () => {
        fetch(`https://www.api-development.xyz/posts/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
            }    
        }).then((response) => {
            if (response.status === 204) {
                setTimeout(() => {
                    window.location.reload();
                    }, 500);
                }
            }
        )
    }

    const editPost = (e) => {
        fetch(`https://www.api-development.xyz/posts/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
            },
            body: JSON.stringify({
                title: editedTitle,
                content: editedContent,
                published: true
            })
        })
    }

    const likePost = (e) => {
        if (liked) {
            fetch(`https://www.api-development.xyz/votes/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                },
                body: JSON.stringify({
                    post_id: id,
                    vote_dir: 0
                })
            }).then(response => response.json()).then(data => console.log(data))
        }
        else {
            fetch(`https://www.api-development.xyz/votes/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                },
                body: JSON.stringify({
                    post_id: id,
                    vote_dir: 1
                })
            }).then(response => response.json()).then(data => console.log(data))
        }

        setLiked(!liked)
    }

    const maxLength = 100
    const shouldTruncate = content.length > maxLength;

    useEffect(() => {
        if (image === '') {
            setHasImage(false)
        }
        else {
            setHasImage(true)
        }
    }, [])

    const navigateToThread = () => {
        navigate(`/threads/${id}`)
        window.location.reload(); 
    }

    const dateString = date
    const dateObject = new Date(dateString);
    const formattedDate = `${dateObject.getFullYear()}-${dateObject.getMonth() + 1}-${dateObject.getDate()} ${dateObject.getHours()}:${dateObject.getMinutes()}`;


  return (
    <div className='bg-white my-4 lg:px-12 px-8 pt-8 pb-4 rounded-xl border-gray-200 border-2 border-solid w-full relative shadow-xl'>
            <div className='flex items-center'>
                <div className='flex w-full justify-between'>
                    <div className='flex items-center'>
                        <img className='w-8 mr-2 hidden md:block' src={pfp} alt='Profile photo'/>
                        <div className='flex flex-wrap'>
                        <span className='mr-2 text-xl'>Posted by {user}</ span>
                        <span className='text-xl'>{formattedDate}</span>
                        </div>
                    </div>
                    <div className='flex items-center'>
                        { options && (
                            <div className='absolute top-20 right-0 bg-white px-4 py-2 rounded-lg z-50'>
                                <div className='flex flex-col'>
                                    <button className='border-solid border-gray-200 border-2 px-8 py-2 shadow-inner' onClick={deletePost}>Delete</button>
                                    <button className='border-solid border-gray-200 border-2 px-8 py-2 shadow-inner' onClick={handleEdit}>Edit</button>
                                    {
                                        edit && (
                                            <div>
                                                  <form
                                                    className="flex flex-col gap-2 mt-2"
                                                    onSubmit={editPost}
                                                  >
                                                    <label htmlFor='email' className='text-xl'>Title</label>
                                                    <input value={editedTitle} onChange={(e) => setEditedTitle(e.target.value)} type='' placeholder='Your title' className='text-black p-2 rounded-xl'/>
                                                    <label htmlFor='password' className='text-xl'>Content</label>
                                                    <input value={editedContent} onChange={(e) => setEditedContent(e.target.value)} type='' placeholder='Your content' className='text-black p-2 rounded-xl'/>
                                                    <button type='submit' className='border-black border-2 border-solid px-10 py-3 bg-white text-black rounded-xl text-2xl opacity-80 hover:opacity-100 transition ease-in-out duration-100 mt-4'>Edit</button>
                                                </form>                                                                     
                                            </div>                                            
                                        ) 
                                    }
                                </div>
                                
                            </div>
                            ) 
                        }
                        <button onClick={handleOptions}>
                            <HiDotsHorizontal size={25}/>
                        </button>
                    </div>
                </div>
            </div>
            <div className='mt-1 cursor-pointer' onClick={navigateToThread}>
                <h1 className='text-3xl font-semibold'>{title}</h1>
                {shouldTruncate && !isExpanded ? (
                    <div>
                        <p className='text-lg'>{content.slice(0, maxLength)}...</p>
                        <button className="text-lg" onClick={handleToggleExpand}>
                        View More
                        </button>
                    </div>
                ) : (
                    <p className='text-lg'>{content}</p>
                )}
                {hasImage ? (
                    <img src={`data:image/png;base64,${image}`} alt="Converting to Image" />
                ) : (
                    <div></div>
                )}
            </div>
            <div className='mt-4'>
            { liked ? (
                <div>
                    <button onClick={likePost}>
                        <HiHeart size={25} color='red'/>   
                    </button>

                </div>
            ) : (
                <button onClick={likePost}>
                    <HiHeart size={25} color='black'/>   
                </button>
            )
            }
            </div>
    </div>
  )
}

export default Post