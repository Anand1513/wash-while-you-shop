
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Layout from "@/components/Layout";
import { Camera, Car, Clock, User } from "lucide-react";

interface WashStep {
  id: string;
  name: string;
  duration: number;
  completed: boolean;
  active: boolean;
}

const TrackWash = () => {
  const [progress, setProgress] = useState(25);
  const [currentStep, setCurrentStep] = useState(1);
  const [isLiveView, setIsLiveView] = useState(false);
  const [washSteps, setWashSteps] = useState<WashStep[]>([
    { id: '1', name: 'Car Detection', duration: 2, completed: true, active: false },
    { id: '2', name: 'Pre-wash Rinse', duration: 3, completed: false, active: true },
    { id: '3', name: 'Soap Application', duration: 5, completed: false, active: false },
    { id: '4', name: 'Scrubbing & Cleaning', duration: 8, completed: false, active: false },
    { id: '5', name: 'Final Rinse', duration: 4, completed: false, active: false },
    { id: '6', name: 'Drying', duration: 3, completed: false, active: false },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });

      // Update steps based on progress
      setWashSteps(prev => prev.map((step, index) => {
        const stepProgress = ((index + 1) / prev.length) * 100;
        return {
          ...step,
          completed: progress > stepProgress,
          active: progress >= stepProgress - 16.7 && progress < stepProgress
        };
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, [progress]);

  const estimatedTimeRemaining = Math.max(0, Math.ceil((100 - progress) * 0.3));

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Live Car Wash Tracking</h1>
          <p className="text-gray-600 mt-2">Watch your Honda City being washed in real-time</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Live Video Feed */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="flex items-center gap-2">
                    <Camera className="h-5 w-5" />
                    Live Camera Feed
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-gray-600">LIVE</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div 
                  className="relative bg-gray-900 rounded-lg overflow-hidden cursor-pointer"
                  style={{ aspectRatio: '16/9' }}
                  onClick={() => setIsLiveView(!isLiveView)}
                >
                  {isLiveView ? (
                    <div className="absolute inset-0 flex items-center justify-center text-white">
                      <div className="text-center">
                        <Camera className="h-16 w-16 mx-auto mb-4 opacity-50" />
                        <p className="text-lg">Live Camera View</p>
                        <p className="text-sm opacity-75">Your car is being washed</p>
                        <div className="mt-4 flex justify-center">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                            <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                            <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-blue-700 flex items-center justify-center text-white">
                      <div className="text-center">
                        <Car className="h-16 w-16 mx-auto mb-4" />
                        <p className="text-lg mb-2">Honda City</p>
                        <p className="text-sm opacity-75">Phoenix Mall - Level 2</p>
                        <Button 
                          className="mt-4"
                          onClick={(e) => {
                            e.stopPropagation();
                            setIsLiveView(true);
                          }}
                        >
                          <Camera className="mr-2 h-4 w-4" />
                          Start Live View
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
                <div className="mt-4 flex justify-between items-center text-sm text-gray-600">
                  <span>Location: Phoenix Mall - Level 2, Bay 15</span>
                  <span>Quality: HD 1080p</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Wash Status */}
          <div className="space-y-6">
            {/* Progress Card */}
            <Card>
              <CardHeader>
                <CardTitle>Wash Progress</CardTitle>
                <CardDescription>{progress.toFixed(0)}% Complete</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Progress value={progress} />
                <div className="flex justify-between text-sm">
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {estimatedTimeRemaining} min remaining
                  </span>
                  <span>Est. completion: {new Date(Date.now() + estimatedTimeRemaining * 60000).toLocaleTimeString()}</span>
                </div>
              </CardContent>
            </Card>

            {/* Car Details */}
            <Card>
              <CardHeader>
                <CardTitle>Car Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Model:</span>
                  <span className="font-medium">Honda City</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Color:</span>
                  <span className="font-medium">White</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">License:</span>
                  <span className="font-medium">DL 01 XX 1234</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Wash Type:</span>
                  <Badge>Premium Wash</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Worker Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Assigned Worker
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-medium">Rajesh Kumar</div>
                    <div className="text-sm text-gray-600">5 years experience</div>
                    <div className="flex items-center gap-1 text-sm">
                      <span className="text-yellow-500">★★★★★</span>
                      <span className="text-gray-600">4.9 rating</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Wash Steps */}
        <Card>
          <CardHeader>
            <CardTitle>Wash Process Steps</CardTitle>
            <CardDescription>Real-time progress of your car wash</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {washSteps.map((step, index) => (
                <div 
                  key={step.id} 
                  className={`flex items-center gap-4 p-4 rounded-lg transition-colors ${
                    step.completed ? 'bg-green-50' : step.active ? 'bg-blue-50' : 'bg-gray-50'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step.completed ? 'bg-green-500 text-white' : 
                    step.active ? 'bg-blue-500 text-white' : 
                    'bg-gray-300 text-gray-600'
                  }`}>
                    {step.completed ? '✓' : index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">{step.name}</div>
                    <div className="text-sm text-gray-600">{step.duration} minutes</div>
                  </div>
                  <div>
                    {step.completed && <Badge variant="secondary">Complete</Badge>}
                    {step.active && <Badge>In Progress</Badge>}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <Button variant="outline">
            📱 Get SMS Updates
          </Button>
          <Button variant="outline">
            📧 Email Notification
          </Button>
          <Button variant="outline">
            📞 Call Support
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default TrackWash;
