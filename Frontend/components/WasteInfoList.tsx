import React from 'react';
import { View, Text } from 'react-native';
import MoreInfoDropdown from './MoreInfoDropdown';

interface WasteItem {
  name: string;
  certainty: string;
  short_explanation: string;
  long_explanation: string;
}

interface WasteInfoListProps {
  wasteItems: WasteItem[];
}

const WasteInfoList: React.FC<WasteInfoListProps> = ({ wasteItems }) => {
  return (
    <View>
      {wasteItems.length === 0 ? (
        <Text>No information available. Please upload an image.</Text>
      ) : (
        wasteItems.map((item, index) => <MoreInfoDropdown key={index} item={item} />)
      )}
    </View>
  );
};

export default WasteInfoList;
