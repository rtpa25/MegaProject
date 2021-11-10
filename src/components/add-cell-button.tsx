/** @format */

interface AddCellButtonProps {
  onClick: () => void;
  buttonText: string;
}

const AddCellButton: React.FC<AddCellButtonProps> = ({
  onClick,
  buttonText,
}) => {
  return (
    <button className='button is-rounded is-primary is-small' onClick={onClick}>
      <span className='icon is-small'>
        <i className='fas fa-plus'></i>
      </span>
      <span>{buttonText}</span>
    </button>
  );
};

export default AddCellButton;
