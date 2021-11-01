import ApolloClient from 'apollo-boost';
import { AsyncStorage } from 'react-native';


const client =new ApolloClient({
    uri:'http://3.121.29.47:3000/',
    request: async (operation) => {
      const token = await AsyncStorage.getItem('token');
      if (!token) return;
      operation.setContext({
        headers: {
          authorization: token,
        },
      });
    }
  });

export default client;