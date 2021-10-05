%%%%%%%%%%%%%%%%%%%%%%%%%%%
% Problem name: 台指期K線圖背景透明化
% Author Name:  陳光穎 Bruce Chen
% Email address: s10601053.md06@nycu.edu.tw
% Department: Medicine, NYCU
% Date: 2021/10/5.
% IP liscencing: MIT Liscence
%%%%%%%%%%%%%%%%%%%%%%%%%%%%
% close all windows
% clear variables, and clear screen
close all; clf; clear; clc;

% show Lab
disp('台指期K線圖背景透明化')  
date = input('Please input the file name.>');
fileName = strcat(date, '.png');
I = imread(fileName);
Id = im2double(I);
imshow(Id);

s = size(Id);
w = s(2);
h = s(1);

%# create alpha channel
Id(:,:,4) = 1;

% change white pixels to transparent ones
for i=25:1:h
    for j=1:1:w
        if Id(i,j,1)==1 & Id(i,j,2)==1 & Id(i,j,3)==1
            Id(i,j,4) = 0;
        end
    end
end

% save
imwrite(Id(:,:,1:3), fileName, 'png', 'Alpha', Id(:,:,4));