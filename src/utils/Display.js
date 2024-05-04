//import { Dimensions } from 'react-native';
import {  Dimensions} from 'react-native';

const {height, width} = Dimensions.get('window');

const setHeight = h => (height / 100) * h;
const setWidth = w => (width / 100) * w;

export const {setHeight, setWidth};
