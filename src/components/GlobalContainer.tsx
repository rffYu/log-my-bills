import { View, Text } from '@tarojs/components';
import { useRecordViewModel } from '@/viewmodels/recordVM';
import { useState } from 'react';
import './AddRecordDrawer.scss';

const AddRecordDrawer = ({ visible, onClose, onSubmit }) => {
  if (!visible) return null;

  return (
    <View className="add-record-drawer">
      <Text>DRAWER</Text>
    </View>);
};

const GlobalContainer = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const { createRecord } = useRecordViewModel();

  return (
    <>
      <View
      style={{
        position: 'fixed',
        right: '20px',
        bottom: '80px',
        width: '50px',
        height: '50px',
        backgroundColor: '#1890ff',
        borderRadius: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 999,
      }}
      onClick={() => setDrawerVisible(true)}
    >
        <span style={{ color: '#fff', fontSize: 24 }}>＋</span>
      </View>

      <AddRecordDrawer
        visible={drawerVisible}
        onClose={() => setDrawerVisible(false)}
        onSubmit={(data) => {
          createRecord(data);
          setDrawerVisible(false);
        }}
      />
    </>
  );
};

export default GlobalContainer;

