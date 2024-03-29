import styled from 'styled-components/native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import TextInputMask,{TextInputMaskProps} from "react-native-text-input-mask";

export const Container = styled.View`
  width: 100%;
  height: 60px;
  padding: 0 16px;
  background: #eee;
  border-radius: 10px;
  margin-bottom: 8px;
  border-width: 2px;
  border-color: #000;

  flex-direction: row;
  align-items: center;

`;

export const Icon = styled(FeatherIcon)`
  margin-right: 16px;
`;
export const FontAwesomeIcon = styled(FontAwesome)`
  margin-right: 16px;
`;

export const TextInput = styled(TextInputMask)`
  flex: 1;
  color: #000;
  font-size: 16px;
  font-family: 'RobotoSlab-Regular';
`;
