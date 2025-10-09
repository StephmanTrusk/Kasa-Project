import './Tag.css';

// eslint-disable-next-line react/prop-types
function Tag({ tagName = "Tag" }) {
  return (
    <div className="tag">
      {/* Rectangle 3 selon Figma */}
      <div className="tag-background"></div>
      
      {/* tag-name selon Figma */}
      <span className="tag-text">{tagName}</span>
    </div>
  );
}

export default Tag;
