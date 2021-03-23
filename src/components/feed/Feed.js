import React, {useState, useEffect} from 'react'
import "./Feed.css"
import InputOption from './InputOption'
import CreateIcon from "@material-ui/icons/Create"
import ImageIcon from "@material-ui/icons/Image"
import EventNoteIcon from "@material-ui/icons/EventNote"
import CalendarViewDayIcon from "@material-ui/icons/CalendarViewDay"
import SubscriptionsIcon from "@material-ui/icons/Subscriptions"
import Post from './post/Post'
import firebase from "firebase"
import {db} from "../../firebase"
import { selectUser } from '../../features/user/userSlice'
import { useSelector } from 'react-redux'
function Feed() {
    const [input, setInput] = useState("")
    const [posts, setPosts] = useState([])
    const user = useSelector(selectUser)
    useEffect(() => {
        db.collection("posts").orderBy("timestamp", "desc").onSnapshot(snapshot => (
            setPosts(snapshot.docs.map(doc => (
                {id:doc.id, data: doc.data()}
            )))
        ))
    }, [])
    const sendPost = (e) => {
        e.preventDefault();
        db.collection("posts").add({
            name: user.displayName,
            description: user.email,
            message: input,
            photoUrl: user.photoUrl || "",
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
        setInput("")
    }
    return (
        <div className="feed">
            <div className="feed_inputContainer">
                <div className="feed_input">
                    <CreateIcon />
                    <form>
                        <input value={input} onChange={(e) => setInput(e.target.value)} type="text" />
                        <button onClick={sendPost} type="submit">Send</button>
                    </form>
                </div>
                <div className="feed_inputOptions">
                    <InputOption title="Photo" Icon={ImageIcon} color="#70b5f9" />
                    <InputOption title="Video" Icon={SubscriptionsIcon} color="#e7a33e" />
                    <InputOption title="Event" Icon={EventNoteIcon} color="#c0cbcd" />
                    <InputOption title="Write article" Icon={CalendarViewDayIcon} color="#7fc15e" />
                </div>
            </div>
            {
                posts.map(({id, data: {name, description, message, photoUrl}})=> (
                    <Post key={id} name={name} description={description} message={message} photoUrl={photoUrl} />
                ))
            }
        </div>
    )
}

export default Feed
