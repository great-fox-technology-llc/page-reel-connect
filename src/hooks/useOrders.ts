import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { shippingAddressSchema } from '@/lib/validation';

// Helper function to mask payment method (security: only show last 4 digits)
const maskPaymentMethod = (paymentMethod: string): string => {
  // If it's a card number, mask all but last 4 digits
  const cardNumberMatch = paymentMethod.match(/\d{4}$/);
  if (cardNumberMatch) {
    const lastFour = cardNumberMatch[0];
    return `•••• •••• •••• ${lastFour}`;
  }
  return paymentMethod;
};

export function useOrders(userId?: string) {
  return useQuery({
    queryKey: ['orders', userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('buyer_id', userId!)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: !!userId,
  });
}

export function useCreateOrder() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (order: any) => {
      // Validate shipping address to prevent over-collection of sensitive data
      if (order.shipping_address) {
        try {
          shippingAddressSchema.parse(order.shipping_address);
        } catch (validationError: any) {
          const errorMessage = validationError.errors?.[0]?.message || "Invalid shipping address";
          throw new Error(errorMessage);
        }
      }

      // Generate unique order number
      const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

      // Mask payment method to store only safe info (last 4 digits)
      const maskedPaymentMethod = order.payment_method 
        ? maskPaymentMethod(order.payment_method)
        : null;

      const { data, error } = await supabase
        .from('orders')
        .insert({ 
          ...order, 
          order_number: orderNumber,
          payment_method: maskedPaymentMethod 
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      toast({ title: 'Order placed successfully' });
    },
    onError: (error: Error) => {
      toast({
        title: 'Failed to create order',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
}

export function useUpdateOrderStatus() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ orderId, status }: { orderId: string; status: string }) => {
      const { error } = await supabase
        .from('orders')
        .update({ status })
        .eq('id', orderId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      toast({ title: 'Order status updated' });
    },
    onError: (error: Error) => {
      toast({
        title: 'Failed to update order status',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
}
