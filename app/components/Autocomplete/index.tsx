import { AutocompleteItem, AutocompleteItems } from "@/models/Autocomplete";
import { ComponentProps, FC, useState } from "react";
import {
  ScrollView,
  StyleProp,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

interface AutocompleteProps extends ComponentProps<typeof TextInput> {
  handleInputChange: (search: string) => void;
  options: AutocompleteItems;
  onSelect: (item: AutocompleteItem) => void;
  RenderItem: FC<RenderItemProps>;
}

export interface RenderItemProps {
  item: AutocompleteItem;
  onSelect: (item: AutocompleteItem) => void;
}

const Autocomplete: FC<AutocompleteProps> = ({
  handleInputChange,
  onSelect,
  options,
  RenderItem,
  style,
  value,
  ...props
}) => {
  const [inputMode, setInputMode] = useState(true);

  if (!RenderItem) {
    return <></>;
  }

  return (
    <View {...props}>
      {inputMode ? (
        <TextInput
          autoFocus={true}
          onChange={(e) => handleInputChange(e.nativeEvent.text)}
          style={style}
        />
      ) : (
        <TouchableOpacity
          onPress={() => setInputMode(true)}
          style={style as StyleProp<ViewStyle>}
        >
          <Text>{value}</Text>
        </TouchableOpacity>
      )}
      {inputMode && (
        <ScrollView
          keyboardDismissMode="on-drag"
          keyboardShouldPersistTaps="handled"
        >
          {options.map((option) => (
            <RenderItem
              key={option.id}
              item={option}
              onSelect={() => {
                onSelect(option);
                setInputMode(false);
              }}
            />
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default Autocomplete;
