import { FormInputLabel, Input, Group } from './form-input.styles';

function FormInput({ label, ...inputOptions }) {
  return (
    <Group>
      <Input {...inputOptions} />
      {/* if the length of the input options is > 0, the shrink function in the styling
      is applied */}
      {label && <FormInputLabel shrink={inputOptions.value.length}>{label}</FormInputLabel>}
    </Group>
  );
}

export default FormInput;
