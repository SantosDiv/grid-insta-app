import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: 30,
    paddingTop: 20,
    height: 250
  },
  profileInfoContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  numberInfoContainer: {
    flexDirection: 'row',
  },
  avatar: {
    backgroundColor: '#000',
    borderRadius: 50,
    height: 90,
    width: 90,
  },
  numberInsta: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  boxNumbersContainer: {
    alignItems: 'center',
    marginLeft: 10,
  },
  nameUser: {
    fontWeight: 'bold',
  },
  btnAdd: {
    width: '80%',
    flexDirection: 'row',
    backgroundColor: '#e5e5e5',
    alignContent: 'center',
    justifyContent: 'center',
    padding: 10,
  }
});
