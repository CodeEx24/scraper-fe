import type { FC } from 'react';
import type { ApiProduct } from '../../types/product';
import { Card } from '../ui/card';
import { CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Button } from '../ui/button';
import {
  TrendingUp,
  TrendingDown,
  Star,
  DollarSign,
  MousePointer,
  ShoppingCart,
  Heart,
  Share2,
  MessageCircle,
  ExternalLink,
} from 'lucide-react';

const numberWithCommas = (x: number) =>
  x.toLocaleString(undefined, { maximumFractionDigits: 2 });

export const ProductCard: FC<{ product: ApiProduct; index: number }> = ({
  product,
  index,
}) => (
  <Card className="overflow-hidden hover:shadow-lg transition-shadow">
    <CardContent className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Product Info - Left Column */}
        <div className="lg:col-span-4 space-y-3">
          <div className="flex items-start gap-3">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🛍️</span>
              <Badge variant="secondary" className="text-xs">
                #{index + 1}
              </Badge>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-lg line-clamp-2">
                {product.title}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                {product.titleGroup}
              </p>
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
              <span className="font-bold">{product.opportunityScore}</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-1">
            {product.category
              .split('/')
              .slice(0, 3)
              .map((cat, catIndex) => (
                <Badge key={catIndex} variant="outline" className="text-xs">
                  {cat}
                </Badge>
              ))}
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {product.trendSummary}
          </p>
        </div>
        {/* Key Metrics - Middle Column */}
        <div className="lg:col-span-5">
          <div className="grid grid-cols-2 gap-4">
            {/* Popularity */}
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-blue-500" />
                <span className="text-sm font-medium">Popularity</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold">
                  {numberWithCommas(product.popularityScore)}
                </span>
                <div className="flex items-center gap-1">
                  {product.popularityChange >= 0 ? (
                    <TrendingUp className="w-3 h-3 text-green-500" />
                  ) : (
                    <TrendingDown className="w-3 h-3 text-red-500" />
                  )}
                  <span
                    className={`text-xs font-medium ${
                      product.popularityChange >= 0
                        ? 'text-green-600'
                        : 'text-red-600'
                    }`}
                  >
                    {product.popularityChange >= 0 ? '+' : ''}
                    {product.popularityChange}%
                  </span>
                </div>
              </div>
            </div>
            {/* CPA */}
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-orange-500" />
                <span className="text-sm font-medium">CPA</span>
              </div>
              <div>
                <span className="text-lg font-bold">
                  $
                  {product.cpa.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
                <p className="text-xs text-muted-foreground">
                  ${numberWithCommas(product.totalCost)} total
                </p>
              </div>
            </div>
            {/* CTR */}
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <MousePointer className="w-4 h-4 text-purple-500" />
                <span className="text-sm font-medium">CTR</span>
              </div>
              <div className="space-y-1">
                <span className="text-lg font-bold">{product.ctr}%</span>
                <Progress value={product.ctr} className="h-1" />
              </div>
            </div>
            {/* CVR */}
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-4 h-4 text-green-500" />
                <span className="text-sm font-medium">CVR</span>
              </div>
              <div className="space-y-1">
                <span className="text-lg font-bold">{product.cvr}%</span>
                <Progress value={product.cvr} className="h-1" />
              </div>
            </div>
          </div>
        </div>{' '}
        {/* Engagement & Actions - Right Column */}
        <div className="lg:col-span-3 space-y-4">
          {/* Engagement */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Engagement</h4>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="space-y-1">
                <Heart className="w-4 h-4 text-red-500 mx-auto" />
                <p className="text-xs font-medium">
                  {numberWithCommas(product.engagement.likes)}
                </p>
              </div>
              <div className="space-y-1">
                <Share2 className="w-4 h-4 text-blue-500 mx-auto" />
                <p className="text-xs font-medium">
                  {numberWithCommas(product.engagement.shares)}
                </p>
              </div>
              <div className="space-y-1">
                <MessageCircle className="w-4 h-4 text-green-500 mx-auto" />
                <p className="text-xs font-medium">
                  {numberWithCommas(product.engagement.comments)}
                </p>
              </div>
            </div>
          </div>
          {/* Reach */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Impressions</span>
              <span className="text-sm font-bold">
                {numberWithCommas(product.impressions)}
              </span>
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  6s View Rate
                </span>
                <span className="text-xs font-medium">
                  {product.viewRate6s}%
                </span>
              </div>
              <Progress value={product.viewRate6s} className="h-1" />
            </div>
          </div>
          {/* Action Button */}
          <Button
            size="sm"
            variant="outline"
            className="w-full gap-2 bg-transparent"
            asChild
          >
            <a href={product.link} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-3 h-3" />
              View Details
            </a>
          </Button>
        </div>
      </div>
    </CardContent>
  </Card>
);
