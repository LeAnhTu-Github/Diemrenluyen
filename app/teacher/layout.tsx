interface EventsLayoutProps {
  children: React.ReactNode;
}

const EventsLayout = ({ children }: EventsLayoutProps) => {
  return (
    <div className="p-6">
      <div className="bg-white rounded-lg shadow-sm">
        {children}
      </div>
    </div>
  );
};

export default EventsLayout;
