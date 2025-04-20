import OptimizedImage from '../assets/optimized-image.jpeg';

const LargeComponent = () => {
  return (
    <div className="container">
      <h2>Large Component</h2>
      <img src={OptimizedImage} alt="Optimized" style={{ maxWidth: '100%', borderRadius: '12px' }} />
    </div>
  );
};

export default LargeComponent;
