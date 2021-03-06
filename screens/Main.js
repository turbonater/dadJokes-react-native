import React, { useContext, useEffect, useMemo, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-navigation'
import { Button, Card } from 'react-native-paper'
import LoginForm from '../components/LoginForm'
import JokeBody from '../components/JokeBody'
import CollapsibleCard from '../components/CollapsibleCard'
import SignUpForm from '../components/SignUpForm'
import useUser from '../hooks/useUser'
import Menu from '../components/menu'
import { JokeContext } from '../context/jokeContext'
import { AuthContext } from '../context/authContext'

const Login = ({ navigation }) => {
  const [LoginMode, setMode] = useState(true)
  const { isSignedIn, user, error } = useUser()

  const { joke, randomJoke } = useContext(JokeContext)
  const { tryLocalSignIn } = useContext(AuthContext)

  const toggleLogin = () => setMode(!LoginMode)

  const heading = useMemo(() => {
    if (isSignedIn) return user.email

    if (LoginMode) {
      return 'Sign In to ♥ this joke'
    } else {
      return 'Create an Account ☺'
    }
  }, [isSignedIn, LoginMode])

  const content = useMemo(() => {
    if (isSignedIn) return <Menu navigation={navigation} />

    if (LoginMode) {
      return <LoginForm toggle={toggleLogin} />
    } else {
      return <SignUpForm toggle={toggleLogin} />
    }
  }, [LoginMode, isSignedIn])

  useEffect(() => {
    randomJoke()
    tryLocalSignIn()
  }, [])

  return (
    <SafeAreaView style={styles.Container} forceInset={{ top: 'always' }}>
      <View style={{ marginHorizontal: 16, marginTop: 24 }}>
        <CollapsibleCard heading={heading}>{content}</CollapsibleCard>
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: 'space-between',
          position: 'relative'
        }}
      >
        <Card style={styles.CardJoke}>
          <JokeBody
            joke={joke ? joke.text : 'khaali'}
            actionButtons={true}
            divider={true}
          />
        </Card>
        <Button
          icon="shuffle"
          style={styles.ButtonNewJoke}
          mode="contained"
          onPress={() => {
            randomJoke()
          }}
        >
          new Joke!
        </Button>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: '#5C5A7A'
  },

  CardJoke: {
    textAlign: 'center',
    height: 'auto',
    padding: 35,
    marginHorizontal: 30,
    borderRadius: 8,
    marginTop: 25,
    backgroundColor: '#e5e5e5'
  },
  ButtonNewJoke: {
    width: 150,
    alignSelf: 'flex-end',
    backgroundColor: 'black',
    borderRadius: 30,
    height: 50,
    paddingTop: 5,
    position: 'absolute',
    bottom: 25,
    right: 25
  }
})
export default Login
