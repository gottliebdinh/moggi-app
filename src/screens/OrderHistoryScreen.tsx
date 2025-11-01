import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, RefreshControl } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { supabase } from '../config/supabase';
import colors from '../theme/colors';

interface Order {
  id: string;
  order_number: string;
  customer_name: string;
  customer_email: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  total_amount: number;
  pickup_date: string;
  pickup_time: string;
  status: 'pending' | 'confirmed' | 'ready' | 'completed' | 'cancelled';
  created_at: string;
}

export default function OrderHistoryScreen() {
  const navigation = useNavigation();
  const { user } = useAuth();
  const { t } = useLanguage();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error(t('orderHistory.loadError'), error);
      } else {
        setOrders(data || []);
      }
    } catch (error) {
      console.error(t('orderHistory.loadError'), error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchOrders();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return t('orderHistory.statusPending');
      case 'confirmed': return t('orderHistory.statusConfirmed');
      case 'ready': return t('orderHistory.statusReady');
      case 'completed': return t('orderHistory.statusCompleted');
      case 'cancelled': return t('orderHistory.statusCancelled');
      default: return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return colors.primary;
      case 'confirmed': return '#4CAF50';
      case 'ready': return '#2196F3';
      case 'completed': return colors.lightGray;
      case 'cancelled': return '#F44336';
      default: return colors.lightGray;
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <Ionicons name="arrow-back" size={24} color={colors.white} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{t('orderHistory.title')}</Text>
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={24} color={colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t('orderHistory.title')}</Text>
        <Text style={styles.headerSubtitle}>
          {orders.length === 0 ? t('orderHistory.noOrders') : orders.length === 1 ? t('orderHistory.orderCount', { count: '1' }) : t('orderHistory.ordersCount', { count: orders.length.toString() })}
        </Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.primary}
          />
        }
      >
        {orders.length === 0 ? (
          <View style={styles.emptyContainer}>
            <View style={styles.iconCircle}>
              <Ionicons name="receipt-outline" size={48} color={colors.white} />
            </View>
            <Text style={styles.emptyTitle}>{t('orderHistory.emptyTitle')}</Text>
            <Text style={styles.emptySubtitle}>
              {t('orderHistory.emptyDescription')}
            </Text>
          </View>
        ) : (
          <View style={styles.ordersContainer}>
            {orders.map((order) => (
              <View key={order.id} style={styles.orderCard}>
                <View style={styles.orderHeader}>
                  <View>
                    <Text style={styles.orderNumber}>{t('orderHistory.orderNumber', { number: order.order_number })}</Text>
                    <Text style={styles.orderDate}>{formatDate(order.created_at)}</Text>
                  </View>
                  <View style={[styles.statusBadge, { backgroundColor: getStatusColor(order.status) }]}>
                    <Text style={styles.statusText}>{getStatusText(order.status)}</Text>
                  </View>
                </View>

                <View style={styles.divider} />

                <View style={styles.orderDetails}>
                  <View style={styles.detailRow}>
                    <Ionicons name="calendar-outline" size={16} color={colors.lightGray} />
                    <Text style={styles.detailLabel}>{t('orderHistory.pickup')}</Text>
                    <Text style={styles.detailValue}>
                      {formatDate(order.pickup_date)}, {order.pickup_time} Uhr
                    </Text>
                  </View>

                  <View style={styles.detailRow}>
                    <Ionicons name="restaurant-outline" size={16} color={colors.lightGray} />
                    <Text style={styles.detailLabel}>{t('orderHistory.items')}</Text>
                    <Text style={styles.detailValue}>{order.items.length}</Text>
                  </View>
                </View>

                <View style={styles.divider} />

                <View style={styles.itemsList}>
                  {order.items.map((item, index) => (
                    <View key={index} style={styles.itemRow}>
                      <Text style={styles.itemQuantity}>{item.quantity}x</Text>
                      <Text style={styles.itemName}>{item.name}</Text>
                      <Text style={styles.itemPrice}>
                        {(item.price * item.quantity).toFixed(2).replace('.', ',')}€
                      </Text>
                    </View>
                  ))}
                </View>

                <View style={styles.divider} />

                <View style={styles.orderFooter}>
                  <Text style={styles.totalLabel}>{t('orderHistory.total')}</Text>
                  <Text style={styles.totalValue}>
                    {order.total_amount.toFixed(2).replace('.', ',')}€
                  </Text>
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkGray,
  },
  header: {
    backgroundColor: colors.black,
    paddingTop: 60,
    paddingBottom: 24,
    paddingHorizontal: 24,
  },
  backButton: {
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 15,
    color: colors.lightGray,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  iconCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.white,
    marginTop: 8,
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 15,
    color: colors.lightGray,
    textAlign: 'center',
  },
  ordersContainer: {
    gap: 16,
  },
  orderCard: {
    backgroundColor: '#1E1E1E',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  orderNumber: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.white,
    marginBottom: 4,
  },
  orderDate: {
    fontSize: 13,
    color: colors.lightGray,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.white,
  },
  divider: {
    height: 1,
    backgroundColor: '#2A2A2A',
    marginVertical: 16,
  },
  orderDetails: {
    gap: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailLabel: {
    fontSize: 14,
    color: colors.lightGray,
    flex: 1,
  },
  detailValue: {
    fontSize: 14,
    color: colors.white,
    fontWeight: '500',
  },
  itemsList: {
    gap: 10,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  itemQuantity: {
    fontSize: 15,
    color: colors.lightGray,
    width: 30,
    fontWeight: '600',
  },
  itemName: {
    flex: 1,
    fontSize: 15,
    color: colors.white,
  },
  itemPrice: {
    fontSize: 15,
    color: colors.white,
    fontWeight: '600',
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: 17,
    fontWeight: '600',
    color: colors.white,
  },
  totalValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
  },
});
