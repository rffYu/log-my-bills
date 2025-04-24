import { View, Text } from '@tarojs/components';
import { useState } from 'react';
import { useRecordViewModel } from '@/viewmodels/recordVM';
import AddRecordDrawer from '@/components/AddRecordDrawer';
import './AddRecordDrawer.scss';

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

