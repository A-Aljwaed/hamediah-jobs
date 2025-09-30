import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { 
  TrendingUp, 
  TrendingDown, 
  Search, 
  MapPin, 
  Building, 
  DollarSign,
  Users,
  Clock,
  BarChart3,
  PieChart,
  Activity
} from 'lucide-react';

interface SearchTrend {
  term: string;
  count: number;
  change: number; // percentage change from previous period
}

interface LocationInsight {
  location: string;
  jobCount: number;
  avgSalary: number;
  growth: number;
}

interface IndustryInsight {
  industry: string;
  jobCount: number;
  avgSalary: number;
  demandLevel: 'high' | 'medium' | 'low';
}

interface SearchAnalyticsData {
  totalSearches: number;
  totalJobs: number;
  avgSalary: number;
  topTrends: SearchTrend[];
  topLocations: LocationInsight[];
  topIndustries: IndustryInsight[];
  searchVolume: {
    today: number;
    thisWeek: number;
    thisMonth: number;
  };
  popularSkills: Array<{
    skill: string;
    demand: number;
    salaryImpact: number;
  }>;
}

interface SearchAnalyticsProps {
  data?: SearchAnalyticsData;
  loading?: boolean;
  timeframe?: 'day' | 'week' | 'month';
  onTimeframeChange?: (timeframe: 'day' | 'week' | 'month') => void;
}

const SearchAnalytics: React.FC<SearchAnalyticsProps> = ({
  data,
  loading = false,
  timeframe = 'week',
  onTimeframeChange
}) => {
  const { t } = useTranslation();

  // Mock data for demonstration
  const mockData: SearchAnalyticsData = {
    totalSearches: 15420,
    totalJobs: 2847,
    avgSalary: 75000,
    topTrends: [
      { term: 'React Developer', count: 1250, change: 15.2 },
      { term: 'Data Scientist', count: 980, change: 8.7 },
      { term: 'Product Manager', count: 875, change: -2.1 },
      { term: 'DevOps Engineer', count: 720, change: 22.5 },
      { term: 'UX Designer', count: 650, change: 5.8 }
    ],
    topLocations: [
      { location: 'San Francisco, CA', jobCount: 485, avgSalary: 125000, growth: 12.3 },
      { location: 'New York, NY', jobCount: 420, avgSalary: 110000, growth: 8.9 },
      { location: 'Seattle, WA', jobCount: 315, avgSalary: 105000, growth: 15.7 },
      { location: 'Austin, TX', jobCount: 280, avgSalary: 85000, growth: 18.2 },
      { location: 'Remote', jobCount: 890, avgSalary: 95000, growth: 25.4 }
    ],
    topIndustries: [
      { industry: 'Technology', jobCount: 1250, avgSalary: 95000, demandLevel: 'high' },
      { industry: 'Healthcare', jobCount: 680, avgSalary: 75000, demandLevel: 'high' },
      { industry: 'Finance', jobCount: 520, avgSalary: 85000, demandLevel: 'medium' },
      { industry: 'Education', jobCount: 380, avgSalary: 55000, demandLevel: 'medium' },
      { industry: 'Marketing', jobCount: 290, avgSalary: 65000, demandLevel: 'low' }
    ],
    searchVolume: {
      today: 1250,
      thisWeek: 8750,
      thisMonth: 35200
    },
    popularSkills: [
      { skill: 'JavaScript', demand: 85, salaryImpact: 12 },
      { skill: 'Python', demand: 78, salaryImpact: 15 },
      { skill: 'React', demand: 72, salaryImpact: 18 },
      { skill: 'AWS', demand: 68, salaryImpact: 22 },
      { skill: 'Machine Learning', demand: 65, salaryImpact: 28 }
    ]
  };

  const analyticsData = data || mockData;

  const formatSalary = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  const getDemandColor = (level: 'high' | 'medium' | 'low') => {
    switch (level) {
      case 'high': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-red-600 bg-red-100';
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="h-8 bg-gray-200 rounded w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Timeframe Selector */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <BarChart3 className="w-6 h-6" />
          {t('search.analytics.title')}
        </h2>
        
        <div className="flex border border-gray-300 rounded-lg overflow-hidden">
          {(['day', 'week', 'month'] as const).map((period) => (
            <button
              key={period}
              onClick={() => onTimeframeChange?.(period)}
              className={`px-4 py-2 text-sm font-medium ${
                timeframe === period
                  ? 'bg-primary-100 text-primary-700'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              {t(`search.analytics.${period}`)}
            </button>
          ))}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Searches</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatNumber(analyticsData.totalSearches)}
                </p>
              </div>
              <Search className="w-8 h-8 text-primary-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Jobs</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatNumber(analyticsData.totalJobs)}
                </p>
              </div>
              <Building className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Salary</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatSalary(analyticsData.avgSalary)}
                </p>
              </div>
              <DollarSign className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Search Volume</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatNumber(analyticsData.searchVolume[timeframe === 'day' ? 'today' : timeframe === 'week' ? 'thisWeek' : 'thisMonth'])}
                </p>
              </div>
              <Activity className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Trending Searches */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              {t('search.analytics.trendingSearches')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {analyticsData.topTrends.map((trend, index) => (
                <div key={trend.term} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-gray-500 w-6">
                      #{index + 1}
                    </span>
                    <span className="font-medium text-gray-900">{trend.term}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">
                      {formatNumber(trend.count)}
                    </span>
                    <div className={`flex items-center gap-1 text-xs ${
                      trend.change >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {trend.change >= 0 ? (
                        <TrendingUp className="w-3 h-3" />
                      ) : (
                        <TrendingDown className="w-3 h-3" />
                      )}
                      {Math.abs(trend.change)}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Locations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              {t('search.analytics.topLocations')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {analyticsData.topLocations.map((location, index) => (
                <div key={location.location} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium text-gray-500 w-6">
                        #{index + 1}
                      </span>
                      <span className="font-medium text-gray-900">{location.location}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-900">
                        {formatNumber(location.jobCount)} jobs
                      </div>
                      <div className="text-xs text-gray-600">
                        {formatSalary(location.avgSalary)} avg
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <div className={`flex items-center gap-1 ${
                      location.growth >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {location.growth >= 0 ? (
                        <TrendingUp className="w-3 h-3" />
                      ) : (
                        <TrendingDown className="w-3 h-3" />
                      )}
                      {Math.abs(location.growth)}% growth
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Industry Insights */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="w-5 h-5" />
              {t('search.analytics.industryInsights')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {analyticsData.topIndustries.map((industry, index) => (
                <div key={industry.industry} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-gray-500 w-6">
                      #{index + 1}
                    </span>
                    <div>
                      <div className="font-medium text-gray-900">{industry.industry}</div>
                      <div className="text-xs text-gray-600">
                        {formatSalary(industry.avgSalary)} avg salary
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">
                      {formatNumber(industry.jobCount)}
                    </div>
                    <Badge 
                      variant="secondary" 
                      className={`text-xs ${getDemandColor(industry.demandLevel)}`}
                    >
                      {industry.demandLevel} demand
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Popular Skills */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              {t('search.analytics.popularSkills')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analyticsData.popularSkills.map((skill, index) => (
                <div key={skill.skill} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-900">{skill.skill}</span>
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-900">
                        {skill.demand}% demand
                      </div>
                      <div className="text-xs text-green-600">
                        +{skill.salaryImpact}% salary impact
                      </div>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${skill.demand}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search Volume Chart Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Search Volume Over Time
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <div className="text-center">
              <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600">Chart visualization would go here</p>
              <p className="text-sm text-gray-500">Integration with charting library needed</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SearchAnalytics;
