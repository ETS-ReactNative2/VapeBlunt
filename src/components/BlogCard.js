import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';

import { colors } from '../assets';

const BlogCard = (props) => {
  const {
    title,
    content,
    publishedAt,
    image,
    url,//open url on browser with RN linking library
  } = props.article

  return (
    <View style={[styles.container, props.style]}>
      <Image source={{uri: image}} 
        style={styles.image}
        resizeMode='contain'
      />
      <Text style={styles.title}>
        {title}
      </Text>
      <Text numberOfLines={3} style={{color:'grey', opacity: .9, textAlign: 'justify'}}>
        {content}
      </Text>
      <TouchableOpacity style={styles.read_button}>
        <Text style={{
          color:"black",
          textAlign: 'center',
          fontSize: 22,
          alignSelf:'center',
          padding: 10,
          fontWeight:'bold'
        }}>
          Leer más
        </Text>
      </TouchableOpacity>
    </View>         
  )
};

const styles = StyleSheet.create({
  container: {
    height: 400,
    marginBottom: 50,
  },
  image: {
    flex: 1,
    width: '100%',
    backgroundColor: colors.lightgrey,
    borderColor: 'green',
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    marginTop: 20,
  },
  read_button: {
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 30,
    marginTop: 20,
  }
})

export default BlogCard;

