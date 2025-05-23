
interface FeaturesIntroProps {
  title: string;
  description: string;
}

const FeaturesIntro = ({ title, description }: FeaturesIntroProps) => {
  return (
    <div className="text-center max-w-3xl mx-auto mb-12">
      <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">{title}</h2>
      <p className="text-lg text-muted-foreground">
        {description}
      </p>
    </div>
  );
};

export default FeaturesIntro;
