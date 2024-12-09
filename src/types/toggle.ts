export type ToggleGroupValue = {
  field: string;
  order: 'asc' | 'desc';
};

export type ToggleGroupItem = {
  label: string;
  value: ToggleGroupValue;
};

export interface ToggleGroupProps {
  items?: ToggleGroupItem[];
  selectedValue?: ToggleGroupValue;
  onClick?: (value: ToggleGroupValue) => void;
}
