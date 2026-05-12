import React from "react";
import { View, Text } from "react-native";
import EmptyState from "./feedback/EmptyState";

type Props = {
  children: React.ReactNode;
};

type State = {
  hasError: boolean;
};

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    // In a real app, we could log this to an error reporting service
    console.error("ErrorBoundary caught error", error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <View className="flex-1 bg-primary-white">
          <EmptyState
            title="Something went wrong"
            subtitle="Please try again or come back later."
          />
        </View>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
