import React, {useState, useEffect} from 'react';
import './App.css';
import Post from './Post';
import { db, auth, storage } from './firebase';
import { Button, Input, makeStyles } from '@material-ui/core';
import { Modal } from '@material-ui/core';
import ImageUpload from './ImageUpload';



function getModalStyle() {
  const top = 50 ;
  const left = 50 ;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function App() {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle)
  const [posts, setPosts] = useState([]);
  const [open, setOpen]= useState(false);
  const [openSignIn, setOpenSignIn] = useState(false)
  const [userName, setUsername]= useState('');
  const [password, setPassword]= useState('');
  const [email, setEmail]= useState('');
  const [user, setUser] = useState(null);
  
 
  useEffect(() =>{
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
        if(authUser){
          // user has logged in
          setUser(authUser);
        } else {
          // user has logged out
          setUser(null);
        }
      })
      return () =>{
        //perform some cleanup action
        unsubscribe();
      }

  }, [user, userName])

  useEffect(()=>{
    db.collection('posts').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id,
        post: doc.data()
      })));
    })
  }, [])

  const signup=(event) =>{
    event.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) =>{
       return authUser.user.updateProfile({
          displayName : userName,
       })
     })
     .catch((error) => alert(error.message))

     setOpen(false);

  }

  const signIn = (event) =>{
    event.preventDefault();
    auth
     .signInWithEmailAndPassword(email, password)
     .catch((error) => alert(error.message))

    setOpenSignIn(false)
  }

 
  return (
    <div className="App">
      {user?.displayName ? (
        <ImageUpload userName = {user.displayName} />

      ) : (
        <h3> soory need to log in to upload</h3>
      )}

      
      <Modal
      open={open}
      onClose={()=> setOpen(false)}
      >
        <div style={modalStyle} className={classes.paper}>
        <form className="app__signup">
            <center>
              <img 
                className="modal__logo"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/archive/2/2a/20160511182000%21Instagram_logo.svg/120px-Instagram_logo.svg.png" 
                alt=""
              />
             </center>
              <Input
              placeholder="username"
              value={userName}
              type="text"
              onChange={(e) => setUsername(e.target.value)}
              />
              <Input
              placeholder="email"
              value={email}
              type="text"
              onChange={(e) => setEmail(e.target.value)}
              />
              <Input
              placeholder="password"
              value={password}
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              />
              <Button type="submit" onClick={signup}>signup</Button>
            
          </form>
        </div>
      </Modal>
      <Modal
      open={openSignIn}
      onClose={()=> setOpenSignIn(false)}
      >
        <div style={modalStyle} className={classes.paper}>
        <form className="app__signup">
            <center>
              <img 
                className="modal__logo"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/archive/2/2a/20160511182000%21Instagram_logo.svg/120px-Instagram_logo.svg.png" 
                alt=""
              />
             </center>
              <Input
              placeholder="email"
              value={email}
              type="text"
              onChange={(e) => setEmail(e.target.value)}
              />
              <Input
              placeholder="password"
              value={password}
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              />
              <Button type="submit" onClick={signIn}>sign In</Button>
            
          </form>
        </div>
      </Modal>
      <div className="App__header">
        <img className="header__logo" 
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/archive/2/2a/20160511182000%21Instagram_logo.svg/120px-Instagram_logo.svg.png"  
        alt="logo" />
      </div>
      {user ? (
        <Button onClick={() => auth.signOut()}>logout</Button>
      ): (
        <div className="app__loginContainer">
          <Button onClick={() =>setOpenSignIn(true)}>sign In</Button>
         <Button onClick={() =>setOpen(true)}>sign Up</Button>
         </div>
      )}
     
      {
        posts.map(({id, post}) =>(
          <Post key={id} userName={post.userName} caption={post.caption} imageUrl={post.imageUrl} comment = {post.comment} />
        ))
      }

    </div>
  );
}

export default App;
