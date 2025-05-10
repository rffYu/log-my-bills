import { View, Text, CoverView } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { useState } from 'react';
import { useRecordViewModel } from '@/viewmodels/recordVM';
import AddRecordDrawer from '@/components/AddRecordDrawer';
import './GlobalContainer.scss';

const isWeapp = Taro.getEnv() === Taro.ENV_TYPE.WEAPP

const PlusSVG = () => {
  return (
      <svg
      className="button"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
      </svg>
  );
}

const GlobalContainer = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const { createRecord } = useRecordViewModel();

  const handleClick = () => setDrawerVisible(true)
  return (
    <>
      {isWeapp ? (
        // 👇 Use cover-view on WeApp
        <CoverView
          className="floating-button"
          style={{
            display: drawerVisible ? 'none' : 'flex',
          }}
          onClick={handleClick}
        >
            <CoverView>
              +
            </CoverView>
          </CoverView>
      ) : (
          // 👇 Use normal View on H5
          <View
            className="floating-button"
            style={{
              display: drawerVisible ? 'none' : 'flex',
            }}
            onClick={handleClick}
          >
              <PlusSVG/>
            </View>
        )}

        <View className={`drawer-container ${drawerVisible ? 'visible' : ''}`} >
          <AddRecordDrawer
          visible={drawerVisible}
          onClose={() => setDrawerVisible(false)}
          onSubmit={(data) => {
            createRecord(data)
            setDrawerVisible(false)
          }}
        />
        </View>
      </>
  );
};

export default GlobalContainer;

