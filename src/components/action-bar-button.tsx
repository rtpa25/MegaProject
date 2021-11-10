/** @format */

interface ActionBarButtonProps {
  onClick: () => void;
  iClassName: string;
}

const ActionBarButton: React.FC<ActionBarButtonProps> = ({
  onClick,
  iClassName,
}) => {
  return (
    <button className='button is-primary is-small' onClick={onClick}>
      <span className='icon'>
        <i className={iClassName}></i>
      </span>
    </button>
  );
};

export default ActionBarButton;
