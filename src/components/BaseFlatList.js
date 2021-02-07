import React from 'react';
import {
  FlatList,
  Text,
  RefreshControl,
} from 'react-native';
import PropTypes from 'prop-types';

import { colors } from '../assets';

export const BaseFlatList = (props) => {
  const {
    data = [],
    emptyMessage = '',
    renderItem,
    onReload,
  } = props;
  const [reloading, setReloading] = React.useState(false);

  function reload(){
    if(onReload){
      setReloading(true);
      onReload()
        .then(() => {
          setReloading(false);
        })
        .catch((e) => setReloading(false));
    }
  }

  const refreshControl = (
    <RefreshControl
      refreshing={reloading}
      onRefresh={reload}
      tintColor={colors.primary}//ios
    />
  )

  //FlatList base functions
  return(
    <FlatList
      data={data} keyExtractor={(item, i) => item.id+i}
      renderItem={renderItem}
      ListEmptyComponent={
        <Text style={{fontSize: 17}}>
          {emptyMessage}
        </Text>
      }
      refreshControl={refreshControl}
      {...props}
    />
  )
}

BaseFlatList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  emptyMessage: PropTypes.string.isRequired,
  renderItem: PropTypes.func.isRequired,
  onReload: PropTypes.func
}

export default BaseFlatList;