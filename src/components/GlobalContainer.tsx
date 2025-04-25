import { View, Text, CoverView } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { useState } from 'react';
import { useRecordViewModel } from '@/viewmodels/recordVM';
import AddRecordDrawer from '@/components/AddRecordDrawer';

const isWeapp = Taro.getEnv() === Taro.ENV_TYPE.WEAPP

const PlusSVG = () => {
  return (
    <>
      <svg
      className="w-6 h-6 text-white"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
      </svg>
      </>
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
          className="fixed bottom-10 right-5 w-12 h-12 bg-blue-500 rounded-full z-[999]"
          style={{
            display: drawerVisible ? 'none' : 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            lineHeight: '3rem',
          }}
          onClick={handleClick}
        >
            <CoverView className="text-white text-xl">
              +
            </CoverView>
          </CoverView>
      ) : (
          // 👇 Use normal View on H5
          <View
            className="fixed bottom-10 right-5 w-12 h-12 bg-blue-500 rounded-full z-[999]"
            style={{
              display: drawerVisible ? 'none' : 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              lineHeight: '3rem',
            }}
            onClick={handleClick}
          >
              <PlusSVG/>
            </View>
        )}

        <View
        className={`fixed bottom-0 left-0 w-full bg-white rounded-t-2xl shadow-lg z-[1000] transform transition-all duration-500 ease-in-out ${drawerVisible ? 'translate-y-0' : 'translate-y-full'}`}
      >
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

